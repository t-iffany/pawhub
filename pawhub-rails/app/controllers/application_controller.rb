class ApplicationController < ActionController::API
  include ActionController::Cookies

  private
  
  def current_user
    User.find_by(id: session[:user_id])
  end

end
