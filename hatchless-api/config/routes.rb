Rails.application.routes.draw do
  scope "/api" do

    devise_for :users, path: "", path_names: {
      sign_in: "login",
      sign_out: "logout",
      registration: "signup"
    }, controllers: {
      sessions: "users/sessions",
      registrations: "users/registrations"
    }

    devise_scope :user do
      get "/users/me", to: "users/sessions#me"
    end


    resources :hatch_reports, only: [ :index, :show, :create, :update, :destroy ]
    resources :hatch_windows, only: [ :index, :show, :create, :update, :destroy ]
    resources :hot_flies, only: [ :index, :show, :create, :update, :destroy ]
    resources :insects, only: [ :index, :show, :create, :update, :destroy ]
    resources :fly_patterns, only: [ :index, :show, :create, :update, :destroy ]
    resources :fly_shops, only: [ :index, :show, :create, :update, :destroy ]
    resources :rivers, only: [ :index, :show, :create, :update, :destroy ]
    resources :shop_rivers, only: [ :index, :show, :create, :update, :destroy ]

    post "fly_patterns/:id/upload_images", to: "fly_patterns#upload_images"
    post "fly_shops/:id/upload_images", to: "fly_shops#upload_images"
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
