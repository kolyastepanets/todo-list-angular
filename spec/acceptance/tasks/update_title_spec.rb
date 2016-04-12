require 'rails_helper'

feature 'update title', %q{
  in order to correct task title
  i want to be able to update my task
} do

  given(:user) { create(:user) }
  given!(:project) { create(:project, user: user) }
  given!(:task) { create(:task, project: project) }

  scenario 'update title', js: true do
    sign_in(user)

    find(".task-title:first-child").hover
    find("#task-edit-btn-#{task.id}").click
    fill_in "task_title", with: 'new task'
    click_on "Update task"
    sleep 1

    expect(page).to have_content "Task's title updated successfully!"
  end

end
