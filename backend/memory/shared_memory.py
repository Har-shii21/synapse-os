class SharedMemory:
    def __init__(self):
        self.memory = {}

    def write(self, key, value):
        self.memory[key] = value

    def read(self, key):
        return self.memory.get(key)

    def read_all(self):
        return self.memory

    def clear(self):
        self.memory = {}