require 'rails_helper'

feature 'delete project', %q{
  i want to be able to delete my project
} do

  given(:user) { create(:user) }
  given!(:project) { create(:project, user: user) }

  scenario 'delete project', js: true do
    sign_in(user)

    find(".the-whole-project").hover
    find("#project-btn-delete-#{project.id}").click
    page.driver.browser.switch_to.alert.accept

    expect(page).to_not have_content project.name
  end

end
