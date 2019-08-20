Rails.application.routes.draw do
  resources :reviews
  resources :shops
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

get '/shopreview/:id', to: 'users#showreview'
end
