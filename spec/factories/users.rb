FactoryGirl.define do
  factory :user do
    username  "test"
    email "test@gmail.com"
    password "password"
    password_confirmation "password"
    confirmed_at Date.today
  end
end