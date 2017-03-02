Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "root#index"
  # wild card for react router

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      as :user do
        post 'users/sign_in', to: 'sessions#create', as: :sessions_create
        delete 'users/sign_out', to: 'sessions#destroy', as: :sessions_destroy
      end
      resources :users
    end
  end

  get "/*all", to: "root#index"
end
