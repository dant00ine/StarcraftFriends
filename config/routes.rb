Rails.application.routes.draw do
  root to: 'application#angular'

  get 'users/:id.json', to: 'users#show'

  post 'groups/:id/invite.json', to: 'groups#invite'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :groups, only: [:create, :index, :show, :update]
end
