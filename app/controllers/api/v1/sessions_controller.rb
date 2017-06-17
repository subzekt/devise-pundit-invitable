module Api
  module V1
    class SessionsController < Devise::SessionsController
      skip_before_action :verify_authenticity_token
      respond_to :json

      def create
        self.resource = warden.authenticate!(auth_options)
        sign_in(resource_name, resource)
        yield resource if block_given?
        response.headers['Authorization'] = JWTWrapper.encode({ user_id: current_user.id })
        render json: resource
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
