require 'base64'

class Api::ImagesController < ApplicationController
  before_action :set_image, only: [:show, :update, :destroy]

  # GET /images
  def index
    @images = Image.all

    render json: @images
  end

  # GET /images/1
  def show
    render json: @image
    # @image = Image.find(params[:id])
    # send_data @image.data, type: 'image/png', disposition: 'inline'
  end

  # POST /images
  def create
    puts "image_params: #{image_params}"
    @image = Image.new(image_params)

    uploaded_file = params[:file_data]
    file_data = uploaded_file.read
    encoded_file = Base64.encode64(file_data)

    @image.file_data = encoded_file

    if @image.save
      render json: @image, status: :created
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /images/1
  def update
    if @image.update(image_params)
      render json: @image
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  # DELETE /images/1
  def destroy
    @image.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_image
      @image = Image.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def image_params
      params.permit(:file_data, :user_id)
    end
end
