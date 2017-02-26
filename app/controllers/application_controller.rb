class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # Callbacks
  before_action :authenticate_user!, :unless => :devise_controller?
  before_action :configure_permitted_parameters, if: :devise_controller?

  before_action :setup_user_for_system, :unless => :devise_controller?

  private

  def configure_permitted_parameters
    added_attrs = [:username, :email, :password, :password_confirmation, :remember_me]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end

  def setup_user_for_system
    # check if the user has temp password
    # if yes force user to change password
    if user_signed_in? && current_user.temp_password.present?
      redirect_to edit_user_registration_path, alert: "You must change your password before logging in for the first time"
    end
  end
end
