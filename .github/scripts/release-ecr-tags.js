/**
 * Release Tags
 *
 * Creating release tag based on each release version for AWS ECR Public
 *
 */

module.exports = ({ context }) => {
  if (context.eventName === "release") {
    return getReleaseTag(context);
  }
  if (isStaging(context) === true) {
    return getMainTag(context);
  }
  if (isDev(context) === true) {
    return getPullRequestTag(context);
  }
  throw new Error(
    "Release Violation: Could not determine the required release tags."
  );
};

function getReleaseTag(context) {
  const semver = context.payload.release.tag_name;
  if (semver.match(/^v[0-9]+\.[0-9]+\.[0-9]+$/) === null) {
    throw new Error(
      `Release Violation: Provided version '${semver}' is not valid semver.`
    );
  }
  return semver.replace("v", "");
}

function getMainTag({ sha }) {
  return `${sha}`;
}

function getPullRequestTag({ payload: { number }, sha }) {
  return `pr-${number}`;
}

function isStaging(context) {
  return context.eventName === "push" && context.ref === "refs/heads/main";
}

function isDev(context) {
  return context.eventName === "pull_request";
}
