module AcceptanceHelper
  def sign_in(user)
    visit '/#/sign_in'

    fill_in "email", with: user.email
    fill_in "password", with: user.password
    click_on 'Sign in'
  end
end
