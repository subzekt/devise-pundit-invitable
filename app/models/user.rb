class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :confirmable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,  :authentication_keys => [:login]

  ########################################
  # Callbacks
  before_save :check_password_changed

  ########################################
  # Validation

  # Only allow letter, number, underscore and punctuation.
  validates_uniqueness_of :username, case_sensitive: false, allow_blank: true
  validates_format_of :username, with: /^[a-zA-Z0-9_\.]*$/, :multiline => true
  validates_presence_of   :username, :if => lambda { |o| o.email.blank? }
  validates_presence_of   :email, :if => lambda { |o| o.username.blank? }
  validates_uniqueness_of :email, allow_blank: true
  # validates_uniqueness_of :email, allow_blank: true, :if => lambda { |o| o.username.blank? }
  validates_format_of     :email, with: /\A[^@]+@[^@]+\z/, allow_blank: true
  validates :password, length: { in: 4..20 }, on: :create
  validates :password, length: { in: 4..20 }, on: :update, allow_blank: true
  validates_confirmation_of :password, if: :password_required?

  ########################################
  # Methods
  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions.to_hash).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
    elsif conditions.has_key?(:username) || conditions.has_key?(:email)
      where(conditions.to_hash).first
    end
  end


  private
  def valid_email?(email)
    # VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    true if email.present? && (email =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i)
  end
  # Checks whether a password is needed or not. For validations only.
  # Passwords are always required if it's a new record, or if the password
  # or confirmation are being set somewhere.
  def password_required?
    !persisted? || !password.nil? || !password_confirmation.nil?
  end

  # check if the password is changed and change the temp password to nil
  # also make sure it is not the case where it is created or reset by the admin
  # in which case temp password will also have changed
  def check_password_changed
    self.temp_password = nil if ( changed.include?('encrypted_password') && !(changed.include?('temp_password')))
  end
end
