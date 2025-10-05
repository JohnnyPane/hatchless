Rails.application.routes.draw do
  scope "/api" do
    resources :rivers, only: [ :index, :show, :create, :update, :destroy ]
    resources :hatch_windows, only: [ :index, :show, :create, :update, :destroy ]
    resources :insects, only: [ :index, :show, :create, :update, :destroy ]
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
