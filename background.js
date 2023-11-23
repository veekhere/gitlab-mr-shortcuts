const commands = new Map([
  ["focus-title", focusTitle],
  ["focus-description", focusDescription],
  ["focus-assignee", focusAssignee],
  ["focus-reviewer", focusReviewer],
  ["focus-milestone", focusMilestone],
  ["focus-labels", focusLabels],
  ["confirm", clickConfirm],
]);

chrome.runtime.onMessage.addListener(function (request) {
  if (request.run) {
    chrome.action.setIcon({
      path: {
        19: "/icon_active_16.png",
        38: "/icon_active_32.png",
      },
    });
  }
});

chrome.commands.onCommand.addListener((command) => {
  const func = commands.get(command);
  if (func) {
    getCurrentTab()
      .then((tab) =>
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func,
        })
      )
      .then(null, () =>
        console.log("An error occurred while executing script")
      );
  }
});

async function getCurrentTab() {
  let queryOptions = { active: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function focusTitle() {
  const titleClass = "merge_request_title";
  const input = document.getElementById(titleClass);
  document.body.click();
  input.focus();
}

function focusDescription() {
  const descriptionClass = "merge_request_description";
  const textarea = document.getElementById(descriptionClass);
  document.body.click();
  textarea.focus();
}

function focusAssignee() {
  const assigneeClass = "merge-request-assignee";
  const assigneeButton = document
    .getElementsByClassName(assigneeClass)[0]
    .getElementsByTagName("button")[0];
  document.body.click();
  assigneeButton.click();
}

function focusReviewer() {
  const reviewerClass = "merge-request-reviewer";
  const reviewerButton = document
    .getElementsByClassName(reviewerClass)[0]
    .getElementsByTagName("button")[0];
  document.body.click();
  reviewerButton.click();
}

function focusMilestone() {
  const milestoneClass = "issue-milestone";
  const milestoneButton = document
    .getElementsByClassName(milestoneClass)[0]
    .getElementsByTagName("button")[0];
  document.body.click();
  milestoneButton.click();
}

function focusLabels() {
  const labelsInputId = "merge_request_label_ids";
  const labelsButton = document
    .getElementById(labelsInputId)
    .parentElement.getElementsByTagName("button")[0];
  document.body.click();
  labelsButton.click();
}

function clickConfirm() {
  const confirmClass = "js-issuable-submit-button";
  const confirmButton = document.getElementsByClassName(confirmClass)[0];
  document.body.click();
  confirmButton.click();
}
