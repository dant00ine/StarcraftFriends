Rails.application.routes.draw do
  root to: 'application#angular'

  # custom users routes
  get 'users/:id.json', to: 'users#show'

  # custom groups routes
  post 'groups/:id/invite.json', to: 'groups#invite'
  get 'groups/:id.json', to: 'groups#show'
  get 'groups/:user_id/:group_id.json', to: 'groups#valid'

  # custom votes routes
  post '/votes/:id/vote.json', to: 'votes#create'
  get '/votes/:id/vote.json', to: 'votes#show'
  get '/votes/:id/finalize.json', to: 'votes#finalize'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :groups, only: [:create, :index, :show, :update, :vote]
end
