require 'rails_helper'

feature 'update date', %q{
  in order to correct task date
  i want to be able to update my end date
} do

  given(:user) { create(:user) }
  given(:project) { create(:project, user: user) }
  given(:task) { create(:task, project: project) }

  scenario 'update date', js: true do
    sign_in(user)

    task.reload
    find(".task-title").trigger(:mouseover)
    find(".btn-for-task.task-edit").click
    find(".uib-weeks:last-child").find(".uib-day.text-center:last-child").click
    click_on "Update date"

    expect(page).to have_content "Date changed successfully!"
  end

end
