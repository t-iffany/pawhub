Rails.application.routes.draw do
  namespace :api do
    resources :discussions
    resources :users
    resources :comments

    get '/', to: "users#show"
    post '/login', to: "sessions#create"
    delete '/logout', to: "sessions#destroy"
    get '/users/1', to: "users#respond_user_info"
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
