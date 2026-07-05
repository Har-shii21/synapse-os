from datetime import datetime


class SharedMemory:

    def __init__(self):
        self.memory = {}
        self.history = []

    def write(self, key, value):
        self.memory[key] = value

        self.history.append(
            {
                "key": key,
                "value": value,
                "timestamp": datetime.now().strftime("%H:%M:%S"),
            }
        )

    def read(self, key):
        return self.memory.get(key)

    # This allows agents to use memory.get(...)
    def get(self, key, default=None):
        return self.memory.get(key, default)

    def read_all(self):
        return self.memory

    def get_history(self):
        return self.history

    def clear(self):
        self.memory = {}
        self.history = []