class RootController < ApplicationController
  skip_before_filter :authenticate_user!
  skip_after_action :verify_authorized

  def index
  end
end
