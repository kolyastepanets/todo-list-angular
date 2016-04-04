require 'rails_helper'

feature 'create new task', %q{
  i want to be able to create task to project
} do

  given(:user) { create(:user) }
  given(:project) { create(:project, user: user) }

  scenario 'create new task', js: true do
    sign_in(user)

    project.reload
    fill_in "new_task", with: 'new task'
    click_on "Add Task"

    expect(page).to have_content "new task"
  end

end
