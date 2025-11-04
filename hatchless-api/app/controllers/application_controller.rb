class ApplicationController < ActionController::API
  before_action :set_default_url_options

  def set_default_url_options
    Rails.application.routes.default_url_options[:host] = ENV["RAILS_HOST"] || "localhost:3000"
    Rails.application.routes.default_url_options[:protocol] = Rails.env.production? ? "https" : "http"
  end
end
