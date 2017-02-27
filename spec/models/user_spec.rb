require 'rails_helper'

RSpec.describe User, type: :model do
  subject {build(:user)}
  it "has a valid factory" do
    expect(subject).to be_valid
  end

  it "is not valid without a username if email is null" do
    subject.email = nil
    expect(subject).to_not be_valid
  end
  it "is valid when username is present but no email" do
    subject.email = nil
    subject.username = 'asd'
    expect(subject).to be_valid
  end

  it "is invalid for username already present" do
    subject.username = "asd"
    subject.save
    new_user = build(:user, username: 'asd')
    expect(new_user).to_not be_valid
  end

  it "is invalid for email already present" do
    subject.save
    new_user = build(:user, username: 'asd')
    expect(new_user).to_not be_valid
  end

  describe "password" do
    it "is invalid for less than 4" do
      subject.password = '123'
      expect(subject).to_not be_valid
    end

    it "is invalid for more than 20" do
      subject.password = '012345678901234567891'
      expect(subject).to_not be_valid
    end
  end

  describe "role" do
    it "allows the role to updated" do
      subject.save
      subject.role = subject.class.roles[:admin]
      expect(subject).to be_valid
    end
  end
end