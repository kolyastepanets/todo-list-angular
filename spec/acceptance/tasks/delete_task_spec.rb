require 'rails_helper'

feature 'delete task', %q{
  i want to be able to delete my task
} do

  given(:user) { create(:user) }
  given(:project) { create(:project, user: user) }
  given(:task) { create(:task, project: project) }

  scenario 'delete task', js: true do
    sign_in(user)

    task.reload
    find(".task-title:first-child").trigger(:mouseover)
    find(".btn-for-task:last-child").click

    expect(page).to have_content "Task deleted successfully!"
  end

end
