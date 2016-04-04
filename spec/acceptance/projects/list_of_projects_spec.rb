require 'rails_helper'

feature 'list of projects', %q{
  i want to be able to see my list of projects
} do

  given(:user) { create(:user) }
  given(:project) { create(:project, user: user) }
  given(:project2) { create(:project, user: user) }

  scenario 'list of projects', js: true do
    sign_in(user)

    expect(page).to have_content project.name
    expect(page).to have_content project2.name
  end

end
