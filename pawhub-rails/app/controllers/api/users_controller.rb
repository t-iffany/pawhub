class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy, :respond_user_info]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1 
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    uploaded_file = params[:avatar]
    avatar = uploaded_file.read
    encoded_file = Base64.encode64(avatar)

    @user.avatar = encoded_file

    if @user.save
      session[:user_id] = @user.id #sets their session
      render json: @user, status: 201
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    @user = User.find_by(id: params[:id])
    
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  #UPLOAD IMAGE /users
  def upload_image
    @user = User.find_by(id: params[:id])

    if @user.update(image: params[:images])
      render json: { message: 'Image uploaded successfully' }
    else
      render json: { error: 'Error uploading image' }, status: :unprocessable_entity
    end
  end
  
  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:username, :email, :dog_name, :breed, :description, :avatar, :password, :user, :id, :images)
    end
end
