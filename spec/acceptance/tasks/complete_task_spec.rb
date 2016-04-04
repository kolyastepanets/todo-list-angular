require 'rails_helper'

feature 'complete task', %q{
  i want to be able to complete task as done
} do

  given(:user) { create(:user) }
  given(:project) { create(:project, user: user) }
  given(:task) { create(:task, project: project) }

  scenario 'complete task', js: true do
    sign_in(user)

    task.reload
    find("#complete-checkbox").set(true)

    expect(page).to have_content "Task updated!"
  end

end
