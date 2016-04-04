require 'rails_helper'

feature 'delete comment', %q{
  in order to improve notes
  i want to be able to delete comment from task
} do

  given(:user) { create(:user) }
  given(:project) { create(:project, user: user) }
  given(:task) { create(:task, project: project) }
  given!(:comment) { create(:comment, task: task) }

  scenario 'delete comment', js: true do
    sign_in(user)

    find("#task-title-#{task.id}").hover
    find("#task-edit-btn-#{task.id}").click
    # save_and_open_page
    find(".btn-for-delete-comment").click

    expect(page).to have_content "Comment successfully removed!"
  end

end
