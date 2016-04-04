require 'rails_helper'

feature 'create new project', %q{
  i want to be able to create new project
} do

  given(:user) { create(:user) }

  scenario 'create new project', js: true do
    sign_in(user)

    find(".add-project").click
    fill_in "input-new-project", with: 'new project'
    click_on "Create"

    expect(page).to have_content "new project"
  end

end
