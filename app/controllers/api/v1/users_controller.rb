module Api
  module V1
    class UsersController < ApiController
      def index
        authorize User
        query = params[:query]
        result = User.all
        if query.present?
          result = result.where('users.username ILIKE ? OR users.email ILIKE?',
                                                 "%#{query}%", "%#{query}%")
        end

        users = result.paginate(page: page).order('email ASC, username ASC')
        pages = result.pages
        render json: { users: users, pages: pages, page: page }
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

      def page
        params[:page].to_i || 1
      end
    end
  end
end