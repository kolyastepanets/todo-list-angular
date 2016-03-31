module AcceptanceHelper
  def sign_in(user)
    visit new_user_session_path

      within(".panel-body")do
        fill_in "user_email", with: user.email
        fill_in "user_password", with: user.password
        click_on 'Sign in'
      end
  end
end
