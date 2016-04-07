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

    find("#task-title-#{task.id}").hover
    find("#task-edit-btn-#{task.id}").click
    fill_in "new_comment", with: 'new comment'
    click_on "Add Comment"
    sleep 1

    expect(page).to have_content "Comment successfully added!"
  end

end
