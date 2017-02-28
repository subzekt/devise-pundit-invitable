require "rails_helper"

RSpec.describe Api::V1::SessionsController, type: :request do
  let(:user) {create(:user)}

  context "invalid logins" do
    it "returns error on wrong password" do
      post "/api/v1/users/sign_in", params: { user: {:login => user.email, password: 'rand' }}
      expect(response.content_type).to eq("application/json")
      expect(response).to have_http_status(:unauthorized)
    end

    it "returns error on wrong login" do
      post "/api/v1/users/sign_in", params: { user: {:login => 'tsss', password: user.password }}
      expect(response.content_type).to eq("application/json")
      expect(response).to have_http_status(:unauthorized)
    end

  end

  it "creates a Session" do
    post "/api/v1/users/sign_in", params: { user: {:login => user.email, password: user.password }}
    expect(response.content_type).to eq("application/json")
    expect(response).to have_http_status(:ok)
    expect(response.headers['Authorization']).to_not be_blank
    json = JSON.parse(response.body)
    expect(json['email']).to eq user.email
  end

  it "destroys a Session"
end