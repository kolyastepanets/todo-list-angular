require 'rails_helper'

feature 'update project', %q{
  in order to correct project name
  i want to be able to update my project
} do

  given(:user) { create(:user) }
  given(:project) { create(:project, user: user) }

  scenario 'update project', js: true do
    sign_in(user)

    project.reload
    find(".the-whole-project").trigger(:mouseover)
    find(".btn-for-project:first-child").click
    fill_in "project_name", with: 'new project'
    click_on "Update"
    click_on "Cancel"

    expect(page).to have_content "Todo list title successfully updated!"
    expect(page).to have_content "new project"
  end

end
