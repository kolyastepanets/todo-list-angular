require 'rails_helper'

feature 'create comment', %q{
  in order to add some notes
  i want to be able to add comment to task
} do

  given(:user) { create(:user) }
  given(:project) { create(:project, user: user) }
  given(:task) { create(:task, project: project) }

  scenario 'create comment', js: true do
    sign_in(user)

    task.reload
    find(".task-title").trigger(:mouseover)
    find(".btn-for-task.task-edit").click
    fill_in "new_comment", with: 'new comment'
    click_on "Add Comment"

    expect(page).to have_content "Comment successfully added!"
  end

end
