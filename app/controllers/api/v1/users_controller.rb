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

        respond_to do |format|
          format.html
          format.json { render json: { users: users } }
        end
      end
    end
  end
end