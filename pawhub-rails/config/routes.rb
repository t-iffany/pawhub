Rails.application.routes.draw do
  namespace :api do
    resources :discussions
    resources :users
    resources :comments
    resources :login
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
