import chalk from 'chalk'

export function withLogs(taskName, taskOrStream) {
  console.log(chalk.blue(`→ Starting: ${taskName}`))

  // Caso: es un stream de Gulp
  if (taskOrStream && typeof taskOrStream.on === 'function') {
    taskOrStream.on('end', () => {
      console.log(chalk.green(`✓ Finished: ${taskName}`))
    })
    taskOrStream.on('error', (err) => {
      console.log(chalk.red(`✗ Error in ${taskName}:`), err.message)
    })
    return taskOrStream
  }

  // Caso: es una Promise o función async
  if (typeof taskOrStream?.then === 'function') {
    return taskOrStream
      .then((res) => {
        console.log(chalk.green(`✓ Finished: ${taskName}`))
        return res
      })
      .catch((err) => {
        console.log(chalk.red(`✗ Error in ${taskName}:`), err.message)
        throw err
      })
  }

  // Caso no soportado
  console.log(chalk.yellow(`! Unknown task type for ${taskName}`))
  return taskOrStream
}
