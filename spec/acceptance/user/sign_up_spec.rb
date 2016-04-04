require 'rails_helper'

feature 'user can register' do

  scenario 'not signed in and not signed up user tries to sign up', js: true do

    visit root_path
    click_on 'Register'
    fill_in 'Email', with: "example@test.com"
    fill_in 'Password', with: "12345678"
    fill_in 'Password confirmation', with: "12345678"
    click_on 'Register'

    expect(page).to have_content "Registered successfully!"

  end

  scenario 'user enters incorrect email', js: true do
    visit root_path
    click_on 'Register'
    fill_in 'Email', with: "example@test"
    fill_in 'Password', with: "12345678"
    fill_in 'Password confirmation', with: "12345678"
    click_on 'Register'

    expect(page).to have_content "Email is not an email"

  end

  scenario 'user enters mismatch password', js: true do
    visit root_path
    click_on 'Register'
    fill_in 'Email', with: "example@test.com"
    fill_in 'Password', with: "12345678"
    fill_in 'Password confirmation', with: "87654321"
    click_on 'Register'

    expect(page).to have_content "Password confirmation doesn't match"

  end

end
