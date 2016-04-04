require 'rails_helper'

feature 'delete project', %q{
  i want to be able to delete my project
} do

  given(:user) { create(:user) }
  given(:project) { create(:project, user: user) }

  scenario 'delete project', js: true do
    sign_in(user)

    project.reload
    find(".the-whole-project").trigger(:mouseover)
    find(".btn-for-project:last-child").click

    expect(page).to_not have_content project.name
  end

end
