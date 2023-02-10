Rails.application.routes.draw do
  
  namespace :api do
    resources :discussions
    resources :users
    resources :comments
    resources :images

    get '/', to: "users#show"
    post '/login', to: "sessions#create"
    delete '/logout', to: "sessions#destroy"
    get '/users/1', to: "users#respond_user_info"
    post '/api/images', to: "images#create"
    post '/upload-image', to: 'users#upload_image'
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
