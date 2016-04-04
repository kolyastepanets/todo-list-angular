require 'rails_helper'

feature 'update project', %q{
  in order to correct project name
  i want to be able to update my project
} do

  given(:user) { create(:user) }
  given!(:project) { create(:project, user: user) }

  scenario 'update project', js: true do
    sign_in(user)

    find(".the-whole-project").hover
    find("#project-btn-edit-#{project.id}").click
    fill_in "project_name", with: 'new project'
    click_on "Update"

    expect(page).to have_content "Todo list title successfully updated!"
  end

end
