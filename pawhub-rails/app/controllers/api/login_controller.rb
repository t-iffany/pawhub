class Api::LoginController < ApplicationController
  before_action :set_login, only: [:show, :update, :destroy]

  # GET /login/1
  def show
    render json: {userId: params[:id]}.to_json
  end

end
