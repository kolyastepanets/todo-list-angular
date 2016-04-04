require 'rails_helper'

feature 'user sign in', %q{
  in order to be able to manage with todo list
  as an user
  i want to be able to sign in
} do

  given(:user) { create(:user) }

  scenario 'registered user tries to sign in', js: true do
    sign_in(user)

    expect(page).to have_content "Signed in successfully!"

  end

  scenario 'unregistered user tries to sign in', js: true do
    visit root_path
    fill_in "email", with: 'wrong@test.com'
    fill_in "password", with: '12345678'
    click_on 'Sign in'


    expect(page).to have_content 'Invalid login credentials. Please try again.'
    expect("/").to eq root_path
  end

end
