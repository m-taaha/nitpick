export async function onPullRequest(payload: any) {
    const {action, pull_request, repository } = payload
    console.log(`PR #${pull_request.number} ${action} on ${repository.full_name}`)
}