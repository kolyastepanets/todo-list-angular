require 'rails_helper'

feature 'delete task', %q{
  i want to be able to delete my task
} do

  given(:user) { create(:user) }
  given!(:project) { create(:project, user: user) }
  given!(:task) { create(:task, project: project) }

  scenario 'delete task', js: true do
    sign_in(user)

    find(".task-title:first-child").hover
    find("#destroy-task-#{task.id}").click

    expect(page).to have_content "Task deleted successfully!"
  end

end
