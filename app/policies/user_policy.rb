class UserPolicy < ApplicationPolicy


  def index?
    @user.admin? or @user.manager?
  end

end
