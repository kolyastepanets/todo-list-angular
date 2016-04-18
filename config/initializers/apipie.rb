Apipie.configure do |config|
  config.app_name                = "Todo List, Ruby on Rails, Angular"
  config.copyright               = "Stepanets &copy; 2016"
  config.doc_base_url            = "/apipie"
  config.api_base_url            = "/api"
  config.api_base_url["v1"]      = "/api/v1"
  config.reload_controllers      = Rails.env.development?
  config.api_controllers_matcher = "#{Rails.root}/app/controllers/api/v1/*.rb"
  config.app_info["v1"]          = "Todo List API documentation"
  config.languages               = ['en']
  config.default_locale          = 'en'
  config.default_version         = 'v1'
end
