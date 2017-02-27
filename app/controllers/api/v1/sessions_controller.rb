module Api
  module V1
    class SessionsController < Devise::SessionsController
      skip_before_action :verify_authenticity_token

      respond_to :json

      def create
        resource = User.find_for_database_authentication(:login => params[:user][:login])
        return invalid_login_attempt unless resource

        if resource.valid_password?(params[:user][:password])
          sign_in(:user, resource)
          resource.ensure_authentication_token
          resource.save!
          response.headers['Authorization'] = resource.authentication_token
          render json: resource
          return
        end
        invalid_login_attempt
      end

      def destroy
        auth_token = request.headers['Authorization']
        resource = User.find_for_database_authentication(authentication_token: auth_token)
        return invalid_attempt unless resource

        resource.authentication_token = nil
        resource.save
        render json: nil
      end

      protected
      def ensure_params_exist
        return unless params[:user].blank?
        render json: {success: false, message: 'Missing login parameters'}, status: 422
      end

      def invalid_login_attempt
        render json: {success: false, message: 'Invalid email or password'}, status: 401
      end

      def invalid_attempt
        render json: {success: false, message: 'Invalid Attempt'}, status: 400
      end


    end

  end
end
