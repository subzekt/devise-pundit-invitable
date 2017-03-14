module Api
  module V1
    class UsersController < ApiController
      def index
        authorize User
        query = params[:query]
        result = User.all
        if query.present?
          result = result.joins(:accounts).where('users.username ILIKE ? OR users.email ILIKE ? OR accounts.name ILIKE ? OR accounts.boid ILIKE ? ',
                                                 "%#{query}%", "%#{query}%", "%#{query}%", "%#{query}%")
        end
        users = result.limit(10)

        render json: { users: users }
      end

      def create
        @user = User.new(secure_params.reject{|_, v| v.blank?})
        res = @user.invite_or_create

        render :json => @user, status: :created and return if res
        render :json => { :errors => @user.errors.messages }, :status => 422 and return
      end

      private

      def secure_params
        params.require(:user).permit(:email, :username)
      end
    end
  end
end