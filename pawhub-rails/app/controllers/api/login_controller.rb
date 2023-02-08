class Api::LoginController < ApplicationController

  # GET /login/1
  def show
    render json: {userId: params[:id]}.to_json
  end

end
