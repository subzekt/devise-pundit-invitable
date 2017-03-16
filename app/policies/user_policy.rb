class UserPolicy < ApplicationPolicy


  def index?
    @user.admin? or @user.manager?
  end

  def create?
    @user.admin?
  end

end
