module Api
  module V1
    class ApiController < ActionController::Base
      before_action :check_authenticate_user!
      respond_to :json

      protected
      def check_authenticate_user!
        auth_token = request.headers['Authorization']
        if auth_token.present?
          @current_user = User.find_by_authentication_token(auth_token)
          if @current_user.present?
          else
            unauthenticated
          end
        else
          unauthenticated
        end
      end

      def unauthenticated
        render :json => {:success => false, :message => 'Permission denied'}, :status => 403
      end
    end
  end
end